import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface ListProps {
  items: { id: string; content: JSX.Element | string }[];
  listClassName?: string;
}

const List: React.FC<ListProps> = ({ items, listClassName }: ListProps) => (
  <ul className={classnames(listClassName, styles.list)}>
    {items.map(item => (
      <li className={classnames(styles.listItem)} key={item.id}>
        <span>{item.content}</span>
      </li>
    ))}
  </ul>
);

export default List;
