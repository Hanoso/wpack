README.md
hanoso

更新流程：
1. git add .   点击changes的加号
2. git commit -m "提交的说明"   右上角选择commit all
3. git push  右上角push


添加所有文件到缓冲区（从目前掌握的水平看，和后面加“.”的区别在于，加all可以添加被手动删除的文件，而加“.”不行）：

git add .

git add --all

删除文件

git rm filename

提交：提交缓冲区的所有修改到仓库(注意：如果修改了文件但是没有add到缓冲区，也是不会被提交的)

git commit -m "提交的说明"

commit可以一次提交缓冲区的所有文件

查看git库的状态，未提交的文件，分为两种，add过已经在缓冲区的，未add过的

git status 

提交本地缓存中的变更到remote仓库
git push