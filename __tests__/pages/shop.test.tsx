import * as sinon from 'sinon';
// import { render, screen } from '@testing-library/react'
// import Shop from '../../src/pages/shop'
// import { StoreService } from '../../src/services/storeService';
// import { GetStaticProps, InferGetStaticPropsType } from 'next';
// import { HomePageInfo } from '../../src/models/homePageInfo';
// import { ProductCardModel } from '../../src/models/productCardModel';
// import { Currency } from '../../src/models/currency';

// describe('Shop page tests', () => {
//     let getHomeText: sinon.SinonStub;

//     beforeEach(() => {
//         getHomeText = sinon.stub(StoreService.prototype, 'getHomeText');
//     });

//     afterEach(() => {
//         getHomeText.restore();
//     });

//     it('renders a greeting', () => {
//         const metaTags = {
//             title: 'title',
//             description: ''
//         }

//         const products: ProductCardModel[] = [
//             {
//                 id: 1,
//                 name: 'Lol1',
//                 image: '',
//                 isInStock: true,
//                 price: {
//                     amount: 1500,
//                     currency: Currency.USD
//                 }
//             },
//             {
//                 id: 2,
//                 name: 'LolLol2',
//                 image: '',
//                 isInStock: false,
//                 price: {
//                     amount: 4200,
//                     currency: Currency.USD
//                 }
//             }
//         ];
//         render(<Shop metaTags={metaTags} products={products} />)

//         expect(screen.queryByText('Lol1')).toBeInTheDocument();
//         expect(screen.queryByText('LolLol2')).toBeInTheDocument();
//     })
// })