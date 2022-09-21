import re
import time
from datetime import datetime
from multiprocessing import Pool
from bs4 import BeautifulSoup
import os
import youtube


def get_watch_history(filepath):
    start_time = time.time()
    with open(os.path.join(filepath, "YouTube and YouTube Music/history/watch-history.html")) as wh:
        soup = BeautifulSoup(wh, "lxml")

        print(f"WH: File opened in {(time.time() - start_time):.2f}")

        start_time = time.time()
        watch_history = soup.find_all(
            class_="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")

        print(f"WH: Find divs completed in {(time.time() - start_time):.2f}")

        start_time = time.time()
        video_ids = []  # Store video ids
        channels = {}  # Store total videos watched from each channel
        for video in watch_history:
            text = video.get_text()
            printable_text = ''.join(
                c for c in text if c.isprintable()).split()
            if printable_text[0][:7] == 'Watched':  # For youtube videos only
                video_date = f"{printable_text[len(printable_text)-4].split(',')[0]}-{printable_text[len(printable_text)-6][-3:]}-{printable_text[len(printable_text)-5].split(',')[0]}"
                video_date = datetime.strptime(video_date, '%Y-%b-%d')
                time_difference = datetime.now() - video_date
                if time_difference.days < 365:
                    # Select all the anchor tags
                    anchors = video.find_all('a')

                    # Videos that've been deleted are length 1. Not sure if you can count mins tho...
                    if len(anchors) == 2:
                        #video_name = anchors[0].string
                        video_url = anchors[0].get('href')
                        video_id = video_url.split(
                            "https://www.youtube.com/watch?v=")[1]

                        channel_name = anchors[1].string
                        channel_url = anchors[1].get('href')
                        channel_id = channel_url.split(
                            "https://www.youtube.com/channel/")[1]

                        video_ids.append(video_id)  # Add video id to list

                        # Add channel if doesn't exist
                        if channel_id not in channels.keys():
                            channels[channel_id] = [0, 'Unkown', []]

                        # Update dictionary with the video id and add videos watched
                        channels[channel_id][0] += 1
                        channels[channel_id][1] = channel_name
                        channels[channel_id][2].append(video_id)

        print(f"WH: Loop Completed {(time.time() - start_time):.2f}")

        # Send videos to youtube API to get duration
        start_time = time.time()
        responses = youtube.main(video_ids)
        print(f"WH: Responses Recieved {(time.time() - start_time):.2f}")

        # Get minuites watched
        start_time = time.time()
        mins_watched = get_minuites_watched(responses)
        print(f"WH: Recieved Minuites Watched {(time.time() - start_time):.2f}")

        # Get top channels
        start_time = time.time()
        top_channels = get_top_channels(channels)
        print(f"WH: Recieved top channels {(time.time() - start_time):.2f}")

        # Return watchtime, total videos & top channels
        return mins_watched, len(video_ids), top_channels

# Get duration of content watched
def get_minuites_watched(responses):
    H = 0  # Total Hours
    M = 0  # Total Mins
    S = 0  # Total Seconds

    # Loop through each response and ad
    for response in responses:
        for video in response['items']:
            # Doesn't count days but who watches a 20 day video? slows fake boosting i guess
            duration = re.split(r'PT', video['contentDetails']['duration'])
            if len(duration) == 2:
                video_time = []
                for char in duration[1]:
                    if char == 'H':
                        H += int(''.join(video_time))
                    elif char == 'M':
                        M += int(''.join(video_time))
                    elif char == 'M':
                        S += int(''.join(video_time))
                    else:
                        video_time.append(char)

    mins_watched = M + (H * 60) + (S / 60)  # Convert time watched to mins
    return mins_watched


def get_top_channels(channels):
    sorted_channels = []

    # Loop through each channel and add to list as dictionaries can't be sorted
    for channel in channels.keys():
        sorted_channels.append([channel, channels[channel][1], channels[channel][0]])

    # Sort the list, highest value first
    top_channels = sorted(sorted_channels, key=lambda x: x[2], reverse=True)
    return top_channels


if __name__ == "__main__":
    get_watch_history()
