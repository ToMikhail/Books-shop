import './styles/main.scss';

const heading = document.createElement('h1')
heading.textContent = 'Как hello!'

const root = document.querySelector('#root')
root.append(heading);
