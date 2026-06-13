import re, json, sys
from collections import defaultdict, Counter
from datetime import datetime

INPUT = "Conversa do WhatsApp com Amor ♥️.txt"

line_pat = re.compile(r'^(\d{2}/\d{2}/\d{4}) (\d{2}:\d{2}) - ([^:]+): (.*)$')
sys_pat = re.compile(r'^(\d{2}/\d{2}/\d{4}) (\d{2}:\d{2}) - (.*)$')

messages = []  # (date, time, sender, text)

with open(INPUT, encoding='utf-8') as f:
    for raw in f:
        line = raw.rstrip('\n')
        m = line_pat.match(line)
        if m:
            date, time, sender, text = m.groups()
            sender = sender.strip()
            messages.append([date, time, sender, text])
        else:
            sm = sys_pat.match(line)
            if sm:
                # system message (encryption notice, group changes, etc) - skip as message but could append
                continue
            else:
                # continuation of previous message
                if messages:
                    messages[-1][3] += '\n' + line

print(f"Total parsed messages: {len(messages)}", file=sys.stderr)

senders = Counter(m[2] for m in messages)
print("Senders:", senders, file=sys.stderr)

# Identify the two main participants
main_senders = [s for s, c in senders.most_common(2)]
print("Main senders:", main_senders, file=sys.stderr)

# Date range
dates = []
for d, t, s, txt in messages:
    dt = datetime.strptime(d + ' ' + t, '%d/%m/%Y %H:%M')
    dates.append(dt)

start_date = min(dates)
end_date = max(dates)
print("Start:", start_date, "End:", end_date, file=sys.stderr)

total_days = (end_date.date() - start_date.date()).days + 1

# Media count
media_markers = ['<Mídia oculta>', '<Media omitted>']
media_count = sum(1 for m in messages if any(mm in m[3] for mm in media_markers))

# Per-sender stats
per_sender_msgs = Counter(m[2] for m in messages)
per_sender_media = Counter()
for m in messages:
    if any(mm in m[3] for mm in media_markers):
        per_sender_media[m[2]] += 1

# Te amo count - look for "te amo" case-insensitive, also "amo vc", "amo você", "te amo muito" etc
te_amo_pat = re.compile(r'\bte\s*amo\b', re.IGNORECASE)
te_amo_count = Counter()
for d, t, s, txt in messages:
    if te_amo_pat.search(txt):
        te_amo_count[s] += 1

# Messages per day
per_day = Counter()
for m in messages:
    per_day[m[0]] += 1

# top days
top_days = per_day.most_common(10)
print("Top days:", top_days, file=sys.stderr)

# Hourly distribution
hour_counter = Counter()
for d, t, s, txt in messages:
    hour = int(t.split(':')[0])
    hour_counter[hour] += 1

# Day of week distribution (0=Monday)
dow_counter = Counter()
for dt in dates:
    dow_counter[dt.weekday()] += 1

# Average messages per day
avg_per_day = len(messages) / total_days

# Words count (rough)
words = 0
for m in messages:
    if not any(mm in m[3] for mm in media_markers):
        words += len(m[3].split())

# Check specific date 28/06/2025
target_date = "28/06/2025"
target_msgs = [m for m in messages if m[0] == target_date]
print(f"Messages on {target_date}: {len(target_msgs)}", file=sys.stderr)
# print first/last few of that day with timestamps for context
for m in target_msgs[:15]:
    print(m, file=sys.stderr)
print("...", file=sys.stderr)
for m in target_msgs[-15:]:
    print(m, file=sys.stderr)

result = {
    "total_messages": len(messages),
    "senders": dict(senders),
    "main_senders": main_senders,
    "start_date": start_date.strftime('%Y-%m-%d'),
    "end_date": end_date.strftime('%Y-%m-%d'),
    "total_days": total_days,
    "avg_per_day": round(avg_per_day, 1),
    "media_count": media_count,
    "per_sender_msgs": dict(per_sender_msgs),
    "per_sender_media": dict(per_sender_media),
    "te_amo_count": dict(te_amo_count),
    "top_days": top_days,
    "hour_distribution": dict(hour_counter),
    "dow_distribution": dict(dow_counter),
    "total_words": words,
}

with open('chat_stats.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("DONE", file=sys.stderr)
