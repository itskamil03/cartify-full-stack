import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }

    return (

        <section className='my-20'>

            <div className='relative overflow-hidden rounded-[36px]
            bg-black px-6 sm:px-10 lg:px-20 py-16'>

                {/* BACKGROUND GLOW */}
                <div className='absolute top-[-100px] right-[-100px]
                w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl'></div>

                <div className='absolute bottom-[-120px] left-[-120px]
                w-[280px] h-[280px] bg-white/5 rounded-full blur-3xl'></div>

                {/* CONTENT */}
                <div className='relative z-10 text-center'>

                    {/* SMALL LABEL */}
                    <p className='text-sm uppercase tracking-[5px]
                    text-gray-400 mb-4'>

                        Newsletter

                    </p>

                    {/* TITLE */}
                    <h2 className='text-4xl md:text-5xl font-bold text-white leading-tight'>

                        Subscribe & Get
                        <br />
                        20% OFF

                    </h2>

                    {/* DESCRIPTION */}
                    <p className='max-w-[650px] mx-auto text-gray-300
                    mt-6 leading-7 text-sm sm:text-base'>

                        Stay updated with the latest fashion trends,
                        exclusive offers and premium new arrivals from CARTIFY.

                    </p>

                    {/* FORM */}
                    <form
                        onSubmit={onSubmitHandler}
                        className='mt-10 max-w-[700px] mx-auto
                        bg-white rounded-full overflow-hidden
                        flex flex-col sm:flex-row items-center'
                    >

                        {/* INPUT */}
                        <input
                            className='w-full flex-1 px-7 py-5 text-black
                            outline-none text-sm'
                            type="email"
                            placeholder='Enter your email address'
                            required
                        />

                        {/* BUTTON */}
                        <button
                            type='submit'
                            className='w-full sm:w-auto bg-black text-white
                            px-10 py-5 text-sm font-semibold
                            hover:bg-gray-900 transition-all duration-300'
                        >

                            SUBSCRIBE

                        </button>

                    </form>

                    {/* EXTRA TEXT */}
                    <p className='text-gray-500 text-xs mt-6 tracking-wide'>

                        By subscribing you agree to our Terms & Privacy Policy.

                    </p>

                </div>

            </div>

        </section>
    )
}

export default NewsletterBox