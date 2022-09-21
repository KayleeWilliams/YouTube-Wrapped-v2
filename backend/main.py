import time

import comments
import likes
import search
import watch
import youtube


def main(filepath):
    start_time = time.time()
    mins_watched, total_videos, top_channels = watch.get_watch_history(
        filepath)

    top_channel_names = []
    for channel in top_channels[:5]:
        top_channel_names.append(channel[1])
    response = youtube.get_channel_pic(top_channels[0][0])
    # Get most watched channel profile picture URL
    top_channel_pic = response['items'][0]['snippet']['thumbnails']['default']['url']

    total_searches = search.get_search_history(filepath)
    total_comments = comments.get_comment_history(filepath)
    total_likes = likes.get_likes_history(filepath)
    
    return mins_watched, total_videos, top_channel_names, total_searches, total_comments, total_likes, top_channel_pic
