import time
import os
from datetime import datetime
from bs4 import BeautifulSoup


def get_search_history(filepath):
    start_time = time.time()
    with open(os.path.join(filepath, "YouTube and YouTube Music/history/search-history.html")) as sh:
        soup = BeautifulSoup(sh, "lxml")

        print(f"SH: File opened in {(time.time() - start_time):.2f}")

        # Find all dividers which hold the search history
        start_time = time.time()
        search_history = soup.find_all(
            class_="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")
        print(f"SH: Find divs completed in {(time.time() - start_time):.2f}")

        total_searches = 0  # Counter to store total searches

        # Check if divider contains a search and if in the past year
        for search in search_history:
            text = search.get_text()
            printable_text = ''.join(
                c for c in text if c.isprintable()).split()
            if printable_text[0] == 'Searched':

                # Get the time too so its exactly 1 year?
                search_date = f"{printable_text[len(printable_text)-4].split(',')[0]}-{printable_text[len(printable_text)-6][-3:]}-{printable_text[len(printable_text)-5].split(',')[0]}"
                search_date = datetime.strptime(search_date, '%Y-%b-%d')
                time_difference = datetime.now() - search_date

                if time_difference.days < 365:
                    total_searches += 1

    return total_searches
