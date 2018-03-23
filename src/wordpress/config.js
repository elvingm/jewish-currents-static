import WPAPI from 'wpapi';

const wp = new WPAPI({ endpoint: 'http://jewishcurrents.org/wp-json' });
export default wp;
