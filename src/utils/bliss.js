import classnames from 'classnames';

const item = (prefix, modifiers, classes) => {
    const blissClass = [prefix];
    const normalizedModifiers = modifiers ? classnames(modifiers) : false;
    const normalizedClasses = classes ? classnames(classes) : false;

    if (normalizedModifiers) {
        blissClass.push(
            normalizedModifiers
                .trim()
                .split(' ')
                .map(mod => `${prefix}--${mod}`)
                .join(' ')
        );
    }

    if (normalizedClasses) {
        blissClass.push(normalizedClasses);
    }

    return blissClass.join(' ');
};

const blissModule = (moduleName, modifiers = false, classes = false) => {
    return item(moduleName, modifiers, classes);
};

const blissElement = (moduleName, elementName, modifiers = false, classes = false) => {
    return item(`${moduleName}-${typeof elementName === "string" ? elementName : undefined}`, modifiers, classes);
};

export const bm = blissModule;
export const be = blissElement;
