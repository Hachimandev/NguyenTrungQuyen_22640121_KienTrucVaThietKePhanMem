from flask import Flask, request, render_template
import redis
import os

app = Flask(__name__)
r = redis.Redis(host=os.environ.get('REDIS_HOST', 'redis'), port=6379)

@app.route('/', methods=['GET', 'POST'])
def vote():
    if request.method == 'POST':
        choice = request.form['choice']
        r.rpush('votes', choice)
        return 'Vote received!'
    return '''
        <form method="post">
            <input type="radio" name="choice" value="A"> A<br>
            <input type="radio" name="choice" value="B"> B<br>
            <input type="submit">
        </form>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)