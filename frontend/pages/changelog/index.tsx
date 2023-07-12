import { List, ListItem, Typography } from '@mui/material';
const ChangelogPage: FC<{
  changelog: Record<string, { version: string; title: string; notes: string }>;
}> = ({ changelog }) => {
  console.log(changelog);

  // function to destruct notes of an entry. sub headers begin with ### and each point begins with -
  const destructNotes = (
    notes: string
  ): {
    [key: string]: string[];
  } => {
    const notesArray = notes.split('###');
    const notesObject = {};
    notesArray.forEach((note) => {
      const noteArray = note.split('-');
      const noteTitle = noteArray[0];
      const notePoints = noteArray.slice(1);
      notesObject[noteTitle] = notePoints;
    });
    return notesObject;
  };

  return (
    <>
      <h1>Changelog</h1>
      <List>
        {Object.entries(changelog).map(([version, changes]) => (
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            key={version}
          >
            <Typography variant="h4">{changes.version}</Typography>
            <Typography variant="h5">{changes.title}</Typography>
            {Object.entries(destructNotes(changes.notes)).map(
              ([noteTitle, notePoints]) => (
                <>
                  <Typography variant="h6">{noteTitle}</Typography>
                  <List>
                    {notePoints.map((notePoint) => (
                      <ListItem key={notePoint}>{notePoint}</ListItem>
                    ))}
                  </List>
                </>
              )
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

import fs from 'fs';
import { parse_js } from 'parse-changelog';
import { FC } from 'react';
export async function getStaticProps(context) {
  const changelogText = fs.readFileSync(
    __dirname + '/../../../../CHANGELOG.md',
    'utf8'
  );
  console.log(changelogText);
  const changelog = JSON.parse(parse_js(changelogText));

  console.log(changelog);
  return {
    props: { changelog },
  };
}

export default ChangelogPage;
