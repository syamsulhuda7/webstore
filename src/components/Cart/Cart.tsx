import CardCart from '../Card-Cart/CardCart';
import styles from './cart.module.scss';

export default function Cart () {
    return (
        <>
            <div className={styles.container}>
                <CardCart/>
            </div>
        </>
    )
}