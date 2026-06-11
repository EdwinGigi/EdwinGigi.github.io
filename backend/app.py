from flask import Flask, jsonify, abort
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for the frontend

# Load data
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data.json')
with open(DATA_FILE, 'r', encoding='utf-8') as f:
    site_data = json.load(f)

@app.route('/api/profile', methods=['GET'])
def get_profile():
    return jsonify(site_data.get('profile', {}))

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(site_data.get('projects', []))

@app.route('/api/games', methods=['GET'])
def get_games():
    return jsonify(site_data.get('games', []))

@app.route('/api/posts', methods=['GET'])
def get_posts():
    # Return posts without full content for the list view
    posts = site_data.get('posts', [])
    posts_list = [{'id': p['id'], 'title': p['title'], 'date': p['date'], 'categories': p['categories']} for p in posts]
    return jsonify(posts_list)

@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    posts = site_data.get('posts', [])
    for post in posts:
        if post['id'] == post_id:
            return jsonify(post)
    abort(404, description="Post not found")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
