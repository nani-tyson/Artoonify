from flask import Flask, request, send_file
from flask_cors import CORS
from cartoonify import cartoonify_image
import numpy as np
import cv2
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/cartoonify', methods=['POST'])
def cartoonify():
    if 'image' not in request.files:
        return {"error": "No image provided"}, 400
    
    file = request.files['image']
    style = request.form.get('style', 'comic').lower()
    
    # Validate style
    valid_styles = ['comic', 'anime', 'watercolor', 'pixel']
    if style not in valid_styles:
        style = 'comic'
    
    try:
        # Read and convert image
        img_stream = file.read()
        file_bytes = np.frombuffer(img_stream, np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Process image
        cartoon = cartoonify_image(img, style=style)

        # Prepare response
        img_pil = Image.fromarray(cartoon)
        buf = io.BytesIO()
        img_pil.save(buf, format='PNG')
        buf.seek(0)
        
        return send_file(buf, mimetype='image/png')
    
    except Exception as e:
        app.logger.error(f"Error processing image: {str(e)}")
        return {"error": "Image processing failed"}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)