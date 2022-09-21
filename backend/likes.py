import csv
import os

from datetime import datetime


def get_likes_history(filepath):
    with open(os.path.join(filepath, "YouTube and YouTube Music/playlists/Liked videos.csv")) as lv:
        data = csv.reader(lv)
        total_likes = 0
        video_flag = False

        for row in data:
            if len(row) != 0 and video_flag:
                # Get the time too so its exactly 1 year?
                like_date = datetime.strptime(
                    row[1].split()[0], '%Y-%m-%d')
                time_difference = datetime.now() - like_date

                if time_difference.days < 365:
                    total_likes += 1

            elif len(row) != 0:
                if row[0] == "Video Id":
                    video_flag = True

        return total_likes

