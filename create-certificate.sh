# Script pra geração do certificado
mkdir -p frontend/qatu/certs

# Usar o IP local da máquina
IP_LOCAL="192.168.1.xx"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout frontend/qatu/certs/server.key \
  -out frontend/qatu/certs/server.crt \
  -subj "/CN=$IP_LOCAL" \
  -addext "subjectAltName = IP:$IP_LOCAL"

echo "Certificados criados com sucesso em ./frontend/qatu/certs/"