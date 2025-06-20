# Motorway UI Test

Welcome to the Motorway UI technical test, focusing on user experience, HTML, CSS, a11y, and leveraging browser APIs.

## Set up

This repo is a Vite app with simple Express server which serves a JSON feed of cars and tags associated.

- Clone the repo and run `npm install`

- `npm run dev` will run both - express server and react app.

Afterward, the React app will be available at `http://localhost:5173/`, and the Express server at `http://localhost:8000/`.

There are two endpoints available:

- http://localhost:8000/api/tags - to return all tags in
- http://localhost:8000/api/tags?tag=ferrari - to return matching tags
- http://localhost:8000/api/cars - to return all cars
- http://localhost:8000/api/cars?tag=ferrari - to return matching cars

### Prerequisites

- Prepare a folder for the live coding challenge.
- Minimum Node version: 18

### Note

- Both the server and React app watch relevant files and hot reload on changes.
- Feel free to modify or install necessary code. If installing packages that are wrappers for native browser APIs, please leave a comment explaining why.

## Tasks - Take home challenge (2 hours)

We appreciate that your time is valuable and recommend you not spend more than 2 hours on these tasks. Focusing on one small thing well or a bigger scope as a proof of concept, both approaches are valid.

### 1. Realtime search

We have an tags api endpoint at `http://localhost:8000/api/tags` which returns an array of all tags available in the format:

```
  [
    "white car",
    "car",
    "orange car",
    "orange",
    "lamborghini",
    "super-car",
    "black car",
    "mercedes-benz",
    "aventador",
  ]
```

By adding a `tag` query the endpoint will return an array of matching tags `http://localhost:8000/tags?tag=re`:

```
  [
    "red car",
    "red",
  ]
```

#### Outcomes

To have a type ahead search functionality like [Pinterest](https://www.pinterest.co.uk/ideas/) which can query the above API and return selectable results.

- Display tags available in a form of dropdown
- Allow available tags to be selected
- Performant fast results
- The dataset is static but **assuming** it could be dynamic would be beneficial
- **Not exposing the whole dataset** would be beneficial

### 2. Realtime search results

Once task one has been completed, when a user selects a tag, another call to `api/cars` endpoint needs to be made to display the result in some UI (similar to [Pinterest](https://www.pinterest.co.uk/search/pins/?q=red%20car&rs=typed)) The more interesting or unique the better, examples could be but not limited too a11y, animation, image optimization, semantic markup, schemas, WebGL. _Again, we appreciate that all of them can't be achieved in two hours and we don't expect to you to cover most of them, let alone all of them._

We have cars api endpoint available at `http://localhost:8000/api/cars` which returns array of all cars available in following format:

```
[
  {
    "id": "m3m-lnR90uM",
    "created_at": "2017-04-14T00:59:12-04:00",
    "updated_at": "2020-04-14T01:05:34-04:00",
    "color": "#E0E4EF",
    "description": "I shot this while doing a job for a luxury automotive storage facility in Baltimore, MD. I wanted to create an ominous sense of intrigue, giving the feeling of a space that was both expansive and enclosed. I enjoy the journey my eyes take from the focal point of the headlamps to the contours of the Camero’s body, and then to the backdrop of stacked automobiles.",
    "alt_description": "white car",
    "tags": ["white", "white car", "car"],
    "likes": 995,
    "user": {
      "id": "9aTMQdp_Djo",
      "updated_at": "2020-04-20T01:34:56-04:00",
      "username": "peterbroomfield",
      "name": "Peter Broomfield",
      "first_name": "Peter",
      "last_name": "Broomfield",
      "bio": "Some days you get the bear, and some days the bear gets you. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody.",
      "location": "Baltimore, MD",
      "profile_image": "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/avatars/warmachine",
      "total_collections": 36,
      "total_likes": 126,
      "total_photos": 1
    },
    "url": "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/m3m-lnR90uM"
  }
  ...
]
```

By adding a `tag` query the endpoint will return an array of matching cars `http://localhost:8000/cars?tag=red`

```
[
  {
    "id": "3akA0XDg1_g",
    "created_at": "2018-02-07T04:02:51-05:00",
    "updated_at": "2020-04-14T01:11:57-04:00",
    "color": "#EEEBE9",
    "description": null,
    "alt_description": "red Ferrari car",
    "tags": ["red car", "red", "ferrari", "car"],
    "likes": 346,
    "user": {
      "id": "ue4EPaEkN5w",
      "updated_at": "2020-04-19T03:59:05-04:00",
      "username": "antoniolio",
      "name": "Matt Antonioli",
      "first_name": "Matt",
      "last_name": "Antonioli",
      "bio": "Besides, you look good in a dress.",
      "location": "Houston, TX",
      "profile_image": "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/avatars/ironman",
      "total_collections": 1,
      "total_likes": 186,
      "total_photos": 58
    },
    "url": "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/3akA0XDg1_g"
  },
  ...
]
```

#### Images

Use `.jpg` (JPEG) or `.webp` (WebP) file extensions when referencing images.

The image links from the responses have excluded file extension. This design is intentional to offer flexibility in the choice of image formats while maintaining a consistent and clean URL structure.

## Designs

Use the provided Figma designs as a visual guide for implementing the app layout, styles, and elements.

Figma: https://www.figma.com/file/AQ6dwlbpusgQzBpJyAqcVq/Recruitment?type=design&node-id=0-1&mode=design&t=5ICSMjEzDNgfOBVg-0
Password: Motorway

## Technical Decisions & Key Libraries

### Key Libraries

- **React Query (@tanstack/react-query)**: Data fetching, caching, and state management for API requests
  - Provides efficient cache invalidation and revalidation
  - loading and error states
  - DevTools for debugging
- **MSW (Mock Service Worker)**: API mocking for testing and development

### Architecture Decisions

1. **Context API for State Management**:

   - Used React's Context API (`SelectionContext`) for sharing the selected tag across components
   - Allows for cleaner component hierarchy without prop-drilling

2. **Component Structure**:

   - Separated concerns with focused components (Header, Task2)
   - Clear hierarchy with App as the main container

3. **Image Optimization**:

   - Implemented picture element with WebP and JPEG fallbacks
   - Used lazy loading for performance optimization

4. **Responsive Design**:

   - CSS Grid layout adjusts based on viewport size
   - Media queries to handle different screen sizes

5. **Testing Strategy**:
   - Mock Service Worker for API request interception
   - Focus on user interactions and behavior

### Future Improvements

- Implement pagination or infinite scroll for large result sets
- Utilize dataset to display information about cars, consider modal approach
- Add error boundaries for more robust error handling
- Consider implementing Suspense for smoother loading experiences
- Utilize service worker for PWA capabilities
- Add accessibility improvements (keyboard navigation, ARIA attributes)
