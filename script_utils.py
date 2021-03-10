import pysftp
import os
import json

# recursively copy all contents from localpath to remotepath, preserving structure
def copy_directory_recursive(sftpinstance, localpath, remotepath):
  # create destination folder if it doesn't exist
  sftpinstance.makedirs(remotepath)

  # list top level files/directories that need transfer
  transfer_paths = [os.path.join(localpath, x) for x in os.listdir(localpath)]
  
  # iterate until list is empty, popping off paths as they are transfered
  while(len(transfer_paths) > 0):
    path = transfer_paths.pop()

    # if the path is a directory, list the subfiles and add them to the list of paths to transfer
    if os.path.isdir(path):
      transfer_paths.extend([os.path.join(path, x) for x in os.listdir(path)])
    
    # if the path is a file, create the parent directories and copy file to proper location
    elif os.path.isfile(path):
      head, tail = os.path.split(path)
      head = head[len(localpath):]
      remote_dir = os.path.join(remotepath, head).replace("\\", "/")
      if remote_dir[0] == "/":
        remote_dir = remote_dir[1:]
      if remote_dir[-1] != "/":
        remote_dir += "/"
      if not sftpinstance.exists(remote_dir):
        # create directories one at a time all the way down
        dirs = remote_dir.split("/")
        for i in range(1, len(dirs)+1):
          dir_to_make = "/".join(dirs[0:i])
          if not sftpinstance.exists(dir_to_make):
            sftpinstance.mkdir(dir_to_make)
      remote_path = remote_dir + tail
      sftpinstance.put(path, remote_path)

# recursively delete remote directory
def delete_directory_contents_recursive(sftpinstance, remotepath):
  # make callbacks to log files to delete and directories to remove
  delete_list = []
  handle_files = lambda x : delete_list.append(("f", x))
  handle_directories = lambda x : delete_list.append(("d", x))
  sftpinstance.walktree(remotepath, fcallback=handle_files, dcallback=handle_directories, ucallback=print)

  # sort files and dirs by deepest first to safely delete
  delete_list.sort(reverse=True, key=lambda x : x[1].count("/"))
  for item in delete_list:
    if item[0] == "f":
      sftpinstance.remove(item[1])
    elif item[0] == "d":
      sftpinstance.rmdir(item[1])

def main():
  print("test scripts")

if __name__ == "__main__":
  main()