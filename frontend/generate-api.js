import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../backend/data.json');
const apiDir = path.resolve(__dirname, './public/api');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

fs.mkdirSync(apiDir, { recursive: true });

fs.writeFileSync(path.join(apiDir, 'profile.json'), JSON.stringify(data.profile || {}));
fs.writeFileSync(path.join(apiDir, 'projects.json'), JSON.stringify(data.projects || []));
fs.writeFileSync(path.join(apiDir, 'games.json'), JSON.stringify(data.games || []));

const postsList = (data.posts || []).map(p => ({
  id: p.id, title: p.title, date: p.date, categories: p.categories
}));
fs.writeFileSync(path.join(apiDir, 'posts.json'), JSON.stringify(postsList));

const postsDir = path.join(apiDir, 'posts');
fs.mkdirSync(postsDir, { recursive: true });
(data.posts || []).forEach(post => {
    fs.writeFileSync(path.join(postsDir, `${post.id}.json`), JSON.stringify(post));
});

console.log('Static API files generated in public/api');
