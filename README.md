# 初始代码

## 启动数据库
```
docker run --network=host  -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
docker run --network=host -v "/home/blog/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

```

## 清空之前开发环境
```
docker kill 容器id
docker rm 容器id

rm -rf blog-data  

docker container prune // 把没用的container都删掉

```

## 创建数据库
```
docker exec -it 容器id bash
psql -U blog
CREATE DATABASE blog_developement ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 开发

## 数据表
首先修改ormconfig.json中的host，然后运行

```
yarn m:run
node dist/seed.js
```

```bash
yarn dev
# or
npm run dev
```

## 部署
```bash
git push 
ssh blog@dev1 'bash -s' < bin/deploy.sh
// 远程需要pull
ssh blog@dev1 'sh /home/blog/app/bin/deploy.sh'
```

```bash 
yarn install --production-false
yarn build
docker build -t fang/node-web-app .
docker run --network=host -p 3000:3000 -d fang/node-web-app
```

## 备忘
```bash
docker run --name nginx1 --network=host -v /home/blog/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/blog/app/.next/static/:/usr/share/nginx/html/_next/static -d nginx:1.19.1```
