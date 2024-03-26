import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test ('renders content', () => {
    const blog = {
        title: 'yeh righto bill',
        author: 'yorak hunt',
        url: 'www.google.io',
        likes: '0'
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    screen.debug(div)
    expect(div).toHaveTextContent('yeh righto bill')
    expect(div).toHaveTextContent('yorak hunt')
    expect(div).not.toHaveTextContent('likes')
    expect(div).not.toHaveTextContent('www.google.io')
})