import requests
import io
import tempfile
from flask import Flask, request, send_file

app = Flask(__name__)

@app.route('/')
def root():
    return "tts up <a href='/api/tts?text=逐家tsò-hué來chhit4-tho5'>example</a>"

@app.route("/api/tts", methods=["GET", "POST"])
async def tts():
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(get_sound_file(request.headers.get("text") or request.values.get("text", "")).getvalue())
        temp_file.seek(0)
    return send_file(temp_file.name, mimetype="audio/mpeg")


def get_sound_file(s: str):
    json = {'taibun': s}
    r = requests.post(f'https://hokbu.ithuan.tw/tau', data=json)
    taibun = r.json()['KIP']
    r = requests.get(f'https://hapsing.ithuan.tw/bangtsam?taibun={taibun}')
    return io.BytesIO(r.content)

if __name__ == '__main__':
    app.run(debug=True, port=7001)