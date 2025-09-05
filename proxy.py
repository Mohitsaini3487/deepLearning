#!/usr/bin/env python3
import http.server
import socketserver
import urllib.request
import urllib.parse
from urllib.parse import unquote
import sys

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/'
        
        # Forward the request to localhost:3000
        try:
            url = f'http://localhost:3000{self.path}'
            
            # Parse query parameters
            if '?' in self.path:
                path, query = self.path.split('?', 1)
                url = f'http://localhost:3000{path}?{query}'
            
            req = urllib.request.Request(url)
            req.add_header('User-Agent', self.headers.get('User-Agent', 'Python-Proxy'))
            req.add_header('Accept', self.headers.get('Accept', '*/*'))
            req.add_header('Accept-Language', self.headers.get('Accept-Language', 'en-US,en;q=0.9'))
            
            with urllib.request.urlopen(req) as response:
                content = response.read()
                self.send_response(response.status)
                
                # Forward headers
                for header, value in response.headers.items():
                    if header.lower() not in ['connection', 'transfer-encoding']:
                        self.send_header(header, value)
                
                self.end_headers()
                self.wfile.write(content)
                
        except Exception as e:
            self.send_error(500, f"Proxy error: {str(e)}")

if __name__ == '__main__':
    PORT = 8080
    with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"Proxy server running at http://0.0.0.0:{PORT}")
        print(f"Forwarding to http://localhost:3000")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down proxy server...")
            httpd.shutdown()