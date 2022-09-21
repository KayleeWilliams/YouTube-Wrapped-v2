import time
import os
from datetime import datetime
from bs4 import BeautifulSoup


def get_comment_history(filepath):
    start_time = time.time()
    with open(os.path.join(filepath, "YouTube and YouTube Music/my-comments/my-comments.html")) as ch:
        soup = BeautifulSoup(ch, "lxml")
        print(f"CH: File opened in {(time.time() - start_time):.2f}")

        # Find all comments in html file
        start_time = time.time()
        comment_history = soup.find_all("li")
        print(f"CH: Find <li> completed in {(time.time() - start_time):.2f}")

        total_comments = 0

        start_time = time.time()
        for comment in comment_history:
            text = comment.get_text()
            printable_text = ''.join(
                c for c in text if c.isprintable()).split()

            # Could easily modify this to count comments in chains and not
            # Checks if comment is reply or added
            if printable_text[1] == "replied":
                date_pos = 9

            elif printable_text[1] == "added":
                date_pos = 8

            if date_pos == 9 or 8:
                video_date = datetime.strptime(
                    printable_text[date_pos], '%Y-%m-%d')
                time_difference = datetime.now() - video_date
                if time_difference.days < 365:
                    total_comments += 1
        
        print(f"CH: Comment history loop completed in {(time.time() - start_time):.2f}")
        return total_comments
