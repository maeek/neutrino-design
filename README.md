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
import { Button } from '@maeek/neutrino-design';
import Button from '@maeek/neutrino-design/components/atoms/buttons/';

import { PrimaryLoader } from '@maeek/neutrino-design/components/molecules/';
import { PrimaryLoader } from '@maeek/neutrino-design/components/molecules/loaders/';
import PrimaryLoader from '@maeek/neutrino-design/components/molecules/loaders/Loader';
```

## List of components

### Atoms

#### Avatar

- Avatar
- AvatarCached

#### Buttons

- Button
- AbortButton
- ActionButton
- ProceedButton
- SecondaryButton

#### Image

- Image
- ImageCached

#### Inputs

- CheckBox
- Input

#### Typography

- Code
- Heading
- Paragraph
- Text

### Layouts

- LayoutCenter
- LayoutContentFooter
- LayoutSideContent
- LayoutTopContent
- LayoutTopContentFooter
- LayoutTopSideContent

### Molecules

- Breadcrumbs
- Code
- ContextMenu
- Drawer
- Loader

### Hooks

- useInput
- useCheckbox
- useConnection
- useDelayUnmount
- usePagination

## TODO

- [ ] Github Actions
- [ ] Tests

### Atoms

- [ ] Input - Range/Slider
- [ ] Input - Multiline text
- [ ] Input - Select
- [ ] Input - File Select
- [ ] Tooltip
- [ ] Badge
- [ ] Chip
- [ ] Notification popup
- [ ] Divider

### Molecules

- [ ] Progress
- [ ] Card
- [ ] Setting with heading, description and checkbox
- [ ] Navigation
- [ ] Searchbar
- [ ] Avatar picker
- [ ] Modal
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

### Organisms

- [ ] Stepper
- [ ] Tabs
- [ ] Bottom navigation
- [ ] Gallery
- [ ] Player
- [ ] Image editor
