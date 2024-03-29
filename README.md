# Neutrino-design atomic component library

## How to use

Add this line to `.npmrc`

```shell
registry=https://npm.pkg.github.com/maeek
```

Install package from command line

```bash
npm install @maeek/neutrino-design
```

After install is complete you can import it in your project
Some examples:

```javascript
import { Button } from "@maeek/neutrino-design";
import Button from "@maeek/neutrino-design/components/buttons/";

import { PrimaryLoader } from "@maeek/neutrino-design/components/molecules/";
import { PrimaryLoader } from "@maeek/neutrino-design/components/molecules/loaders/";
import PrimaryLoader from "@maeek/neutrino-design/components/molecules/loaders/Loader";
```

## List of components

## TODO

- [ ] Github Actions
- [ ] Tests

- [x] Avatar
- [x] Input - Range/Slider
- [ ] Input - Multiline text
- [x] Input - Select
- [ ] Input - File Select
- [ ] Tooltip
- [ ] Badge
- [x] Chip
- [ ] Notification popup
- [ ] Divider
- [x] Button
- [x] AbortButton
- [x] ActionButton
- [x] ProceedButton
- [x] SecondaryButton
- [x] Image
- [x] CheckBox
- [x] Input
- [x] Code
- [x] Heading
- [x] Paragraph
- [x] Text
- [ ] Progress
- [ ] Card
- [ ] Setting with heading, description and checkbox
- [ ] Navigation
- [ ] Searchbar
- [ ] Avatar picker
- [x] Modal
- [ ] List input aka tags
- [ ] Expandable block
- [ ] Box
- [ ] Message bubble
- [ ] Reaction selector
- [ ] Skeleton
- [ ] Popup
- [ ] Dialogs
- [ ] Drag and Drop
- [ ] Loaders (Partially completed)
- [x] Breadcrumbs
- [x] Code
- [x] ContextMenu
- [x] Drawer - TODO: fix animation
- [x] Loader
- [ ] Stepper
- [ ] Tabs
- [ ] Bottom navigation
- [ ] Gallery
- [x] Player
- [ ] Image editor

### Layouts

- [x] LayoutCenter
- [x] LayoutContentFooter
- [x] LayoutSideContent
- [x] LayoutTopContent
- [x] LayoutTopContentFooter
- [x] LayoutTopSideContent

### Hooks

- [x] useInput
- [x] useCheckbox
- [x] useConnection
- [x] useDelayUnmount
- [x] usePagination
- [x] useAccessibility
- [x] useClickOutside
- [x] useContinuativeSearch
