# Yet Another Weather App

Honestly, I've spent way too much time for what seems to be a "simple" weather app. But I'm quite proud of what I've achieved [here](https://weather.redvelo.site/)
I hope this repo will serve as a good starting point for those who are new to NextJS.

Countless hours spent on:

- Making my unique design from scratch, I wanted the **_colors to POP_** - this might not be everyone's cuppa.
- Responsive design, had to be **_very good looking_** in phones, tablets & PC.
- **_90+_** Pagespeed score.
- Learn and implement core concepts of Nextjs 13; mixing SSR with CSR was when it came to Hydration, but it's definitely worth it for the performance gains.
- Add subtle animations.

The codebase is kind of a mess, because I started this off with CRA before moving on NextJS pages router. It was later updated to NextJS app router for enhanced server rendering.
As a result of multiple migrations/experimentation, the codebase contains several redundant files/functions. I intend to keep it that way so the changes are quite evident especially to highlight the differences between SSR/RSC & CSR.
The commit messages might not make sense, I've pushed code through phone a few times...

# Core Technical Features

- RSC app with data passed to components as props, if you'd like to see RSC + CSR which fetches data on the server and passes it down to components over context rather than props then checkout the SSR_CSR branch.
- Server actions for client side calls.
- LazyMotion for reduced bundle size of framer motion.
- Custom React hooks.
- Recently implemented **_Dark Mode!_**
- **_Colors change_** based on temp range.
- Identify location based on IP.

## Requirements

- This is a NextJS app, requires a valid runtime/server.
- Obviously requires API keys for **OpenWeather**[to fetch weather] & **Mapbox**[for geocoding], more details can be found in .env.example

## Potential Improvements

I'm extremely satisfied with the current state of this app, but it does not mean there's no room for improvements. I can think of few things.

- Fahrenheit conversion is something few people requested.
- Probably have a linear bar to display the intensity of UVI.
- Display Sunrise/Sunset in cool way, I like how Accuweather does it.
- TypeScript support??

If this repo helps you in any way, don't forget to star it :)
