import numpy as np
import os
from multiprocessing import Pool
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'


def main(video_ids):

    np_array = np.array(video_ids)
    chunk_size = 30

    # Split up the array into chunks to reduce requests to api so no rate limit
    chunked_arrays = np.array_split(np_array, len(video_ids) / chunk_size)
    chunked_list = [list(array)
                    for array in chunked_arrays]  # Convert back to list
    
    # Multi processing to speed it up... 
    with Pool() as p:
        responses = p.map(send_request, chunked_list)
        return responses

def send_request(id_list):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    response = youtube.videos().list(
        part="snippet,contentDetails,statistics",
        id=id_list
    ).execute()

    return response

# Get channel profile picture from the API
def get_channel_pic(channel_id):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    response = youtube.channels().list(
        part="snippet,contentDetails,statistics",
        id=channel_id
    ).execute()

    return response  
