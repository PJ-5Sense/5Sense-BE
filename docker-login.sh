# docker login
echo "dckr_pat_GbNbafixm5nIFcXMr816FH0jy3Y" | docker login --username taesik97 --password-stdin

# docker build
docker buildx build -t taesik97/oh-sense:tagname .

# docker image push 
docker image push taesik97/oh-sense:tagname

