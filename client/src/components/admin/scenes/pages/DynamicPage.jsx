import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreatePageMutation, useGetPageQuery, useUpdatePageMutation, useGetPagesQuery } from '../../state/api';
import { Select, SelectItem, Input } from '@nextui-org/react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const DynamicPage = () => {
    const classes = useStyles();
    const [selectedPage, setSelectedPage] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [identifier, setIdentifier] = useState('');
    const { data: pages, isLoading: pagesLoading } = useGetPagesQuery();
    const pageQuery = useGetPageQuery(selectedPage);
    const [updatePage] = useUpdatePageMutation();
    const [createPage] = useCreatePageMutation();

    useEffect(() => {
        if (pageQuery.data) {
            setContent(pageQuery.data.body);
            setTitle(pageQuery.data.title);
            setIdentifier(pageQuery.data.identifier);
        }
    }, [pageQuery]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pageQuery.data) {
            try {
                await updatePage({ id: pageQuery.data._id, body: content });
                alert('Page updated successfully!');
            } catch (err) {
                alert('An error occurred while updating the page.');
            }
        } else {
            try {
                await createPage({ identifier: identifier, title: title, author: 'Admin', body: content });
                alert('Page created successfully!');
            } catch (err) {
                alert('An error occurred while creating the page.');
            }
        }
    };

    if (pagesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.root}>
                <Typography component="h1" variant="h5">
                    Edit Page
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input placeholder="Identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                    <Input placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Select placeholder="Select a page" value={selectedPage} onChange={(value) => setSelectedPage(value)} >
                        {pages && pages.map((page) => (
                            <SelectItem key={page._id} value={page.identifier}>
                                {page.title}
                            </SelectItem>
                        ))}
                    </Select>
                    <Box mt={2}>
                        <ReactQuill value={content} onChange={setContent} />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default DynamicPage;
