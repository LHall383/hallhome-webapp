import pysftp
import os
import json
import importlib.util
import paramiko

# import our utils module
spec = importlib.util.spec_from_file_location("script_utils", location="../script_utils.py")
script_utils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(script_utils)

# read in constants from config file
config = json.loads(open("..\\push-to-server.json", "rb").read())

# get the known hosts file which contains the server
print("Getting known hosts from {} to verify connections...".format(config["known_hosts"]))
cnopts = pysftp.CnOpts(knownhosts=config["known_hosts"])

# connect to the server to replace server files
print("Connecting to server at {} as {}".format(config["host_name"], config["uname"]))
with pysftp.Connection(host=config["host_name"], username=config["uname"], password=config["pw"], cnopts=cnopts) as sftp:
    print("-Changing context to dir: {}".format(config["remote_server_build_dir"]))
    with sftp.cd(config["remote_server_build_dir"]):
        # remove all current content from the server
        print("--Deleting current directory contents")
        script_utils.delete_directory_contents_recursive(sftp, '.')

        # move build files to server
        print("--Copying build files to server")
        script_utils.copy_directory_recursive(sftp, config["local_server_build_dir"], '.')

print("\nFinished copying build files!")

# reload the server component
s = paramiko.SSHClient()
s.load_system_host_keys(filename=config['known_hosts'])
s.connect(hostname=config['host_name'], username=config['uname'], password=config['pw'])

print("Reloading webapp with {}".format(config["reload_cmd"]))
(stdin, stdout, stderr) = s.exec_command(config["reload_cmd"])
print(stdout.readlines())
s.close()

print("\nFinished server deploy!")
