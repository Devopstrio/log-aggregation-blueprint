from fastapi import APIRouter
router = APIRouter()
@router.get('/search')
def search_logs():
    return {'status': 'ok'}
@router.get('/stream')
def stream_logs():
    return {'status': 'ok'}
