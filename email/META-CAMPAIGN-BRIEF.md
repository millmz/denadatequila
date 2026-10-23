# Meta lead-gen campaign: build brief

For whoever is driving Ads Manager (Adam, or Claude in his browser). Build
everything below, then STOP at the Publish step and let Adam press it.
Do not change budgets, audiences or URLs beyond what is written here. If a
setting is not mentioned, leave Meta's default.

Account: De Nada Tequila (Adam Millman). Pixel / dataset: **De Nada
Tequila Pixel**, ID 3958712751050131. Landing page:
https://www.denadatequila.com/recipes.html. Creatives: the six JPGs Adam
has (ad-paloma-4x5, ad-paloma-9x16, ad-oldfashioned-4x5,
ad-oldfashioned-9x16, ad-founders-4x5, ad-founders-9x16).

## 1. Campaign

| Setting | Value |
|---|---|
| Buying type | Auction |
| Objective | Leads |
| Campaign name | Recipes lead gen |
| Special ad categories | None |
| Advantage campaign budget | On |
| Daily budget | $40 |
| Campaign spending limit | $1,200 (optional cap for the first month) |
| Bid strategy | Highest volume (the default) |

No end date.

## 2. Ad set

| Setting | Value |
|---|---|
| Ad set name | Website leads, 34 states |
| Conversion location | Website |
| Performance goal | Maximize number of conversions |
| Dataset | De Nada Tequila Pixel (do not create a new one) |
| Conversion event | Lead (it may say "no recent activity"; select it anyway) |
| Schedule | Start the next morning, no end |
| Locations | United States, only these states and DC: Arizona, California, Colorado, Connecticut, Delaware, District of Columbia, Florida, Georgia, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Massachusetts, Minnesota, Missouri, Nevada, New Jersey, New Mexico, New York, North Carolina, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, Texas, Vermont, Washington, West Virginia, Wisconsin, Wyoming |
| Location type | People living in or recently in this location |
| Age | 21 to 65+ |
| Gender | All |
| Detailed targeting | Leave empty |
| Languages | Leave empty |
| Audience exclusions | If a custom audience named "Email List" (synced from Klaviyo) exists, exclude it. If not, skip |
| Placements | Advantage+ placements |

Alcohol note: Meta requires 21+ in the US, which the age setting covers. If
Meta shows an alcohol-related policy prompt, accept it.

## 3. Ads (three, in the same ad set)

Common settings for all three:

| Setting | Value |
|---|---|
| Identity | Facebook page: De Nada Tequila. Instagram: @denadatequila |
| Format | Single image |
| Branding | Add: name "De Nada Tequila", logo = the Instagram profile picture or the De Nada primary logo |
| Media | Feed, Explore, in-stream and right column: the 4:5 file. Stories and Reels: the 9:16 file. Use "Edit placements" or "Crop" to assign each file |
| Call to action | Sign Up |
| Website URL | the ad's URL below, pasted exactly, including the tracking tags |
| Tracking | Website events: De Nada Tequila Pixel. Leave URL parameters empty (they are already in the URL) |
| Advantage+ creative enhancements | Turn off text improvements and image enhancements, so the copy and photos stay as written |

**Ad 1: Paloma**
- Ad name: Paloma
- Files: ad-paloma-4x5.jpg, ad-paloma-9x16.jpg
- Primary text: Twenty-six tequila cocktails, one at a time, from the people who make the tequila. Real measurements, the right bottle for each drink, nothing you need a bar for. It starts with the Paloma. Free.
- Headline: Twenty-six cocktails. One at a time.
- Description: The De Nada recipe book, by email.
- URL: https://www.denadatequila.com/recipes.html?utm_source=meta&utm_medium=paid&utm_campaign=recipes-leadgen&utm_content=paloma

**Ad 2: Old Fashioned**
- Ad name: Old Fashioned
- Files: ad-oldfashioned-4x5.jpg, ad-oldfashioned-9x16.jpg
- Primary text: We wrote down the drinks we actually make at home. Twenty-six of them, each with the measurements, the method and which of our three bottles it wants. One recipe at a time, free, from Danny and Adam at De Nada Tequila.
- Headline: The drinks we actually make.
- Description: A cocktail book, by email. Free.
- URL: https://www.denadatequila.com/recipes.html?utm_source=meta&utm_medium=paid&utm_campaign=recipes-leadgen&utm_content=oldfashioned

**Ad 3: Founders**
- Ad name: Founders
- Files: ad-founders-4x5.jpg, ad-founders-9x16.jpg
- Primary text: We make the tequila in the highlands of Jalisco. We will send you the drinks. Twenty-six recipes, one at a time, starting with the Paloma. No noise, just the book.
- Headline: We make the tequila. We'll send the drinks.
- Description: Twenty-six recipes, free.
- URL: https://www.denadatequila.com/recipes.html?utm_source=meta&utm_medium=paid&utm_campaign=recipes-leadgen&utm_content=founders

## 4. Before publishing, check

- Each ad's preview shows the 4:5 image in Feed and the 9:16 in Stories.
- Each ad's link opens recipes.html with the right utm_content.
- The ad set shows the dataset and the Lead event, and exactly 34 states plus DC.
- Daily budget $40 at the campaign level.

Then stop. Adam presses Publish. Meta's review for alcohol can take a few hours.

## 5. After it is live

- Events Manager → Test events: a signup on recipes.html should show a Lead.
- Tell the weekly Klaviyo routine the daily budget so the Monday report can show cost per subscriber (signups whose signup_source starts with "recipes:recipes-leadgen").
- Day 7: pause any ad over $8 per lead. Day 14: if under $4, raise to $60 a day.
