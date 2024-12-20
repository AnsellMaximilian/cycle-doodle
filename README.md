*This is a submission for the [DevCycle Feature Flag Challenge](https://dev.to/challenges/devcycle): Feature Flag Funhouse*

{% embed https://youtu.be/7Yc0D68X1Hs %}

## What I Built
<!-- Share an overview about your project. -->

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iu5ybpm9x6vnoeoee5og.png)
I built a little game called Cycle Doodle for this challenge. Here's a little background on how I came up with this web game:

This dev challenge called for us to explore the capabilities of [DevCycle](https://www.devcycle.com/) and what it can do for our apps. So, I thought I would further challenge myself in building this app by exclusively utilizing only DevCycle's services/features. So besides a frontend framework, which will be NextJs for this, I won't be using any other external third party services like a database, socket, etc.

Cycle Doodle is a simple web game in which you'll join one of three teams and then either draw a simple prompt on a grid with simple colors, guess what other teams have drawn, or vote/rate those other teams' drawings.

Your team will cycle through these roles every time a member of a team does one of these actions (draw, guess, vote), hence the name "Cycle Doodle".

To encourage users to choose their teams, each team will have a distinct advantage over the other:
- Grid Goblins: Other teams get 100 cells in a grid, while this one gets 144, allowing for more details.
- Edit Emperors: Unlike other teams, this one can edit and draw over colored cells in the grid.
- Paint Paladins: Other teams get 5 colors to pain their cells, while this team gets 10.

Then users can view the gallery to see all the drawings by all the teams. The separation and advantages will allow us to see the difference in drawing quality and creativity between all the teams given a different set of tools.

A few chosen users (myself) can act as admins to edit the list of possible prompts.

## How DevCycle Was Used

### Assigning Users to Teams (Audience)
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8l46y2aixh9i3ri3ojzt.png)

DevCycle allows you to create user groups called [Audiences](https://docs.devcycle.com/platform/feature-flags/targeting/audiences). I thought this would be perfect feature to use for my team assignment feature. This not only allows me to group each user to a different team, but also serve values differently based on what group a user is in. This will be useful in differentiating each team by their advantages.

![Teams](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ktbppg07ou6urtqce0zm.PNG)

As you can see, besides "Admin", I have three separate audiences denoting which team a user could belong too.

Then, I also made a [Feature](https://docs.devcycle.com/platform/feature-flags/features) to serve certain values based on which team a user is on.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y4qvaklk2uzz89ikvf24.PNG)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pknwe8schhdbufwm06mv.PNG)

I have also made 3 different configurations for a variable within that feature. Further, I set the targeting rules as such that different audiences will get served different values. Luckily for me, DevCycle allows for the serving of many kinds of values, like JSON. For example, Grid Goblins will get:

```json
{
  "gridSize": 100,
  "canEdit": false,
  "colors": [// colors]
}
```

Now, how do I actually assign these users to their chosen teams without having to go to the DevCycle dashboard each time a user chooses? Fortunately, DevCycle provides a very complete list of APIs that I can use. One of those allows me to update/create audiences.

So, since I'm already using NextJS, I can use its route handlers to securely call the [the api](https://docs.devcycle.com/management-api/#tag/Audiences/operation/AudiencesController_findOne) to update which users belong in which audience.

### Cycling Team Roles
Now that there are dedicated audiences for certain teams, I can reuse this as much as I want. Including in this little feature of the game. As I've mentioned, each time will have a different role, namely, Drawer, Guesser, and Voter; each time a user does a particular action for their role, the teams' roles will shift.

Well, the way I did this is the same as before -- with a feature. I made another feature called "Team Role". And instead of JSON, I will serve different strings for different Audiences. For example, at one point in time, Edit Emperors will be served `guesser`, Grid Goblins will be served `drawer`, etc.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/46aa9439zbhhx4yyk02j.PNG)

Now, for shifting the roles, I did a similar thing as the assigning of teams. APIs! Again, DevCycle generously provided me with [the perfect API](https://docs.devcycle.com/management-api/#tag/Feature-Configurations/operation/FeatureConfigsController_findAll). By hitting this endpoint, I can programmatically and dynamically cycle the roles of the teams.

#### Real Time Updates
DevCycle provides real time updates to their feature variables. So, right after I cycle through the team roles through the API, I don't even have to manually update it on the frontend. DevCycle will give the most recent value and the app will automatically pick up on the change and update it.

### Saving, Fetching, and Updating Prompts
I mentioned in the beginning that I challenged myself to not use any external services like databases. Well, I didn't. But how do I store the prompts, drawings, guesses, etc. persistently and share it across all users? Well, Features to the rescue again!

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qo7a6s9ribny1synt5lj.PNG)

Unlike the other features before, I will serve this variable to all users so they all have access to it.

#### Drawing
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/afztmy53h1n4cofkojl2.png)

When your team currently has the "Drawer" role, this is what you will see. Simply fill up the grid with the colors you have and submit it. This will hit another different API provided by DevCycle, which is the [update feature API](https://docs.devcycle.com/management-api/#tag/Features/operation/FeaturesController_remove).

I simply hit this API to update the "prompts" feature variable with how the user has drawn in the grid. Then I also cycle the team roles.

#### Guessing
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zoxesuzjy2j5oyc799h9.png)

When your team currently has the "Guesser" role, this is what you will see. Try to guess what this other team has drawn.

#### Voting/Scoring
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zksss6tazbf56oldybc9.png)

When your team currently has the "Voter" role, this is what you will see. Rate the drawing from 1 through 5.

### Gallery
Users can also view prompts in the gallery. See how other teams drew their prompts and see if it was guessed correctly.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/surow0950u1892sqdmaa.png)

### Authorization
This I can see being a very important use case for DevCycle. Permissions/Authorizations. I've established that users can draw, guess, and vote on prompts.

But I want to be able to add/delete/update those prompts as well. And I can't just let any user be able to do that. What do I do to make special privileges on certain users (myself)? Because I don't want to have to update the JSON every time I want to update a prompt.

Feature and Audience are a great duo, and they've come to the rescue again. What I've done is created a special Audience and included only myself as the sole member.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qipoq3g0wwvtkpoe3e6w.PNG)

I've also created yet another feature called "Is Admin". It's a boolean feature, and I serve `true` only to members in the Admin Audience.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uw4vit26ymu33mnxmic5.PNG)

This way I can determine which content to render and which action to allow based on the served value. For example: 

```typescript
export default async function AdminPage() {
  const isAdmin = await getVariableValue("is-admin", false);

  if (!isAdmin)
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <Image src={logo} width={200} height={200} alt="logo" />
        <h1 className="text-3xl font-bold mt-16">Access Denied</h1>
        <p>You need to be an admin to access this page.</p>
      </div>
    );

  return (
    <div>
      <PlayContextProvider>
        <AdminControl />
      </PlayContextProvider>
    </div>
  );
}

```

Here's the gallery when viewed as an admin. There's a create button on the bottom right and a delete button for each prompt:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/08gudm4rja0bj4ugjv45.png)

## Demo
<!-- Share a link to your app and include some screenshots here. -->
Here's a little demo video for my app:
{% embed https://youtu.be/7Yc0D68X1Hs %}

Here's the live app:
[https://cycle-doodle.vercel.app/](https://cycle-doodle.vercel.app/)

Screenshots of the application flow can be viewed above.

## My Code
<!-- Share a link to your code repository and make sure you’ve included a MIT license. -->
Here's my code repository:
[https://github.com/AnsellMaximilian/cycle-doodle](https://github.com/AnsellMaximilian/cycle-doodle)

## My DevCycle Experience
<!-- Tell us how you leveraged DevCycle’s technology and feel free to include any feedback you have about their products.  -->
It was my first time using a Feature Flag service, and I have to say it is pretty great.

I especially like the ability to define audiences. I also love the fact that you can serve many different kinds of values. I know being able to serve JSON values allow me to develop this whacky app without a database, but I really believe it will be useful beyond that; rendering/launching features based on more complex values other than on/off for real applications.

I also love that it provides real time updates. Really saved me from some headaches in the frontend.

Targeting rules and the fact that you can rank the order of precedence is also REALLY cool.

I also bet there will be a lot of useful custom software/extensions made for DevCycle thanks to the provided API. Maybe some in-house solution to integrate DevCycle in people's or companies' own platforms.


### Additional Prize Categories

<!-- Please list the additional prize categories your submission qualifies for (if any) -->
My submission also qualifies for "API All-Star", as it's a major part of the application. I use the APIs extensively: updating audience targeting rules, cycling team roles by updating a feature's targeting rules by audience IDs, updating feature variables, and so on.

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Don't forget to add a cover image (if you want). -->

<!-- Thanks for participating! -->
