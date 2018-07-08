Resize
======
A width-resizable component for [React](http://facebook.github.io/react/index.html).

## Prerequisites
- [yarn](https://yarnpkg.com/)

## Installation
run:
```
yarn add https://github.com/studyjan/resize#master
```

then you can then import Resize component from:

```
import Resize from 'resize/lib/components/Resize';
```


## Usages
```
<Resize>
	<img src={'http://via.placeholder.com/500x200'} alt="" style={{ width: '100%' }} />
</Resize>
```


## Options
- width:
	- set start width of Resize component, pixels or percent
	- `width={100}`
	- `width={'50%'}`
- height:
	- set height of Resize component, pixels or percent
	- `height={100}`
	- `height={'50%'}`
- maxWidth:
	- set max width of Resize component, pixels or percent
	- `maxWidth={100}`
	- `maxWidth={'50%'}`
- minWidth:
	- set min width of Resize component, pixels or percent
	- `minWidth={100}`
	- `minWidth={'50%'}`
- className:
	- add custom class, formatted by lib [classnames](https://github.com/JedWatson/classnames)
	- `className='customClass'`
	- `className={{ custom: true, secondCustom: false }}`
- onStopResize:
	- callback function called on stop resizing with argument contain object with `width` and `height`
	- `onStopResize={({ width }) => { console.log(width) }}`

## Examples
for explore examples clone repository and run `yarn example`:
```
git clone https://github.com/studyjan/resize.git
cd resize
yarn example
```

## Tests
for run test clone repository and run `yarn test`:
```
git clone https://github.com/studyjan/resize.git
cd resize
yarn test
```
