import hmac
import hashlib

def verify_webhook_signature(payload: bytes, signature: str, secret: str) -> bool:
    if not signature or not secret:
        return False
    
    if not signature.startswith("sha256="):
        return False
        
    expected_mac = hmac.new(
        secret.encode("utf-8"),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    expected_signature = f"sha256={expected_mac}"
    
    return hmac.compare_digest(expected_signature, signature)
