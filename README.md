## File Manager

### Notes

- Use 20.x.x LTS version of Node.js
- The program is started by npm-script `start` in following way:

```bash
npm run start -- --username=your_username
```

### List of operations and their syntax:

* Go upper from current directory:
```bash
up
```
* Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute):
```bash
cd path_to_directory
```
* Print in console list of all files and folders in current directory:
```bash
ls
```
* Read file and print it's content in console:
```bash
cat path_to_file
```
***If the `path_to_file` contains whitespaces, use double quotes***
```bash
# example
cat "filename with whitespaces.md"
```
* Create empty file in current working directory:
```bash
add new_file_name
```
You can add multiple files at once.
***If the `new_file_name` contains whitespaces, use double quotes.*** 
When adding multiple files, **each `new_file_name`** must be enclosed in double quotes:
```bash
# example
add some-file.txt another-file.txt one-more-file.txt
add "filename with whitespaces.md"
add "first.md" "second.md" "third with whitespaces.md"
```
* Rename file:
```bash
rn path_to_file new_filename
```
***If the `path_to_file` and/or `new_filename` contains whitespaces, each of them must be enclosed in double quotes*** 
```bash
# example
rn app/oldFilename.js newFilename.js
rn "third file.md" "fourth file.md"
```
* Copy file:
```bash
cp path_to_file path_to_new_directory
```
***If the `path_to_file` and/or `path_to_new_directory` contains whitespaces, each of them must be enclosed in double quotes*** 
```bash
# example
cp test.txt ../app
cp "test.txt" "new dir"
```
* Move file:
```bash
mv path_to_file path_to_new_directory
```
***If the `path_to_file` and/or `path_to_new_directory` contains whitespaces, each of them must be enclosed in double quotes*** 
* Delete file:
```bash
rm path_to_file
```
* Calculate hash for file and print it into console:
```bash
hash path_to_file
```
* Compress file (using Brotli algorithm):
```bash
compress path_to_file path_to_destination
```
***If the `path_to_file` and/or `path_to_destination` contains whitespaces, each of them must be enclosed in double quotes***
 * Decompress file (using Brotli algorithm):
```bash
decompress path_to_file path_to_destination
```
***If the `path_to_file` and/or `path_to_destination` contains whitespaces, each of them must be enclosed in double quotes***
* Operating system info:
  - Get EOL:
```bash
os --EOL
```
  - Get host machine CPUs info:
```bash
os --cpus
```
  -Get home directory:
```bash
os --homedir
```
  - Get current system user name:
```bash
os --username
```
  - Get CPU architecture:
```bash
os --architecture
```
