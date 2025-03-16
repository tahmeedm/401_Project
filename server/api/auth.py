from fastapi import APIRouter, Depends, Request
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import RedirectResponse
from fastapi import HTTPException
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_DISCOVERY_URL

oauth = OAuth()
router = APIRouter()

# OAuth Client setup
oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    refresh_token_url=None,
    client_kwargs={"scope": "openid profile email"},
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    userinfo_endpoint="https://www.googleapis.com/oauth2/v3/userinfo",  # Google User Info
)

# Google Login Route
@router.get("/auth/google")
async def google_login(request: Request):
    redirect_uri = url_for("auth.google_auth", _external=True)
    return await oauth.google.authorize_redirect(request, redirect_uri)

# Google Callback Route (handling response)
@router.route("/auth/google/callback")
async def google_auth(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user = await oauth.google.parse_id_token(request, token)
    
    # Here, you can save the user's info into the database or session
    return {"user_info": user}
