from requests import post, get, put
from .credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_tokens(session_key):
	user_tokens = SpotifyToken.objects.filter(user=session_key)
	if user_tokens.exists():
		return user_tokens[0]
	else:
		return None


def update_create_user_tokens(session_key, access_token, token_type, refresh_token, expires_in):
	tokens = get_user_tokens(session_key)
	expires_in = timezone.now() + timedelta(seconds=expires_in)

	if tokens:
		tokens.access_token = access_token
		tokens.expires_in = expires_in
		tokens.token_type = token_type
		tokens.save(update_fields=["access_token", "expires_in", "token_type"])
	else:
		tokens = SpotifyToken(user=session_key, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
		tokens.save()


def is_spotify_authenticated(session_key):
	tokens= get_user_tokens(session_key)
	if tokens:
		expiry = tokens.expires_in
		if expiry <= timezone.now():
			refresh_spotify_token(session_key)

		return True
			

	return False

def refresh_spotify_token(session_key):
	refresh_token = get_user_tokens(session_key).refresh_token
	print(refresh_token)

	response = post("https://accounts.spotify.com/api/token", data={
		"grant_type": "refresh_token",
		"refresh_token": refresh_token,
		"client_id" : CLIENT_ID,
		"client_secret": CLIENT_SECRET,
	}).json()
	print(response)

	access_token = response.get("access_token")
	print(access_token)
	token_type = response.get("token_type")
	expires_in = response.get("expires_in")

	update_create_user_tokens(session_key, access_token, token_type, refresh_token, expires_in)

def execute_spotify_api_request(session_key, endpoint, post_=False, put_=False ):
	tokens = get_user_tokens(session_key)
	header = {"Content-Type": "application/json", "Authorization": "Bearer " + tokens.access_token}
	if post_:
		post(BASE_URL + endpoint, headers=header)
	if put_:
		put(BASE_URL + endpoint, headers=header)

	response = get(BASE_URL + endpoint, {}, headers=header)

	try:
		return response.json()
	except:
		return {"Error": "Issue with request"}