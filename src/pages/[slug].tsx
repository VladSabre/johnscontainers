import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type RedirectSource = {
    path: string
}

const Redirect = (data: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug === data.path)
            router.push('/shop');
    }, [slug, data])

    return null;
}

export const getStaticProps: GetStaticProps<RedirectSource> = async (_context) => {
    return {
        props: { path: 'product' }
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export default Redirect