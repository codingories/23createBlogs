import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from './entity/Post';

createConnection().then(async connection => {
    const posts = await connection.manager.find(Post);
    if(posts.length===0){
        await connection.manager.save([
            new Post('Post 1', '我的第1篇文章'),
            new Post('Post 2', '我的第2篇文章'),
            new Post('Post 3', '我的第3篇文章'),
            new Post('Post 4', '我的第4篇文章'),
            new Post('Post 5', '我的第5篇文章'),
            new Post('Post 6', '我的第6篇文章'),
            new Post('Post 7', '我的第7篇文章'),
            new Post('Post 8', '我的第8篇文章'),
            new Post('Post 9', '我的第9篇文章'),
            new Post('Post 10', '我的第10篇文章'),
            new Post('Post 11', '我的第11篇文章'),
        ]);
        console.log('posts 数据填充了');
    }
    await connection.close();
}).catch(error => console.log(error));
