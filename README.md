Hey :wave:

I've been struggling for a while when FE is seperate from BE and you have whole interface list on FE side and a list of Interface on BE. Something changes on BE and FE does not know about it.

So what have I done?

Played around with this little bit of code. What the setup does is, it looks at a swagger file, generate types and create wrapper classes. You then have FE that does the same. One source of truth. Clean , consistent and simple.
