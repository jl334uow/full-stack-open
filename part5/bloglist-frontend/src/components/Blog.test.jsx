import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test ('renders content', () => {
    const blog = {
        title: 'yeh righto bill',
        author: 'yorak hunt'
    }

    const { container } = render(<Blog blog={blog}/>)
    screen.debug(container)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'yeh righto bill'
    )
})