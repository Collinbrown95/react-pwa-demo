from http.server import HTTPServer, SimpleHTTPRequestHandler

class CustomRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add custom headers before ending headers
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        super().end_headers()

def run(server_class=HTTPServer, handler_class=CustomRequestHandler, port=8001):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
