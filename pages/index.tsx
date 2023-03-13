import type { NextPage } from "next";
import { getTwitchStreams } from "../src/coh3stats-api";
import { Container, Image, Paper, Title, Text, Group } from "@mantine/core";
import { Github } from "../components/icon/github";
import { Donate } from "../components/icon/donate";
import { Discord } from "../components/icon/discord";
import TwitchPanel from "../components/twitch-panel/twitch-panel";
import { TwitchStream } from "../src/coh3/coh3-types";

type Props = {
  twitchStreams: TwitchStream[] | null;
  error: Error | null;
};
const Home: NextPage<Props> = ({ twitchStreams, error }) => {
  return (
    <Container fluid>
      <Image
        src="/coming-soon/coh3-background.jpg"
        alt={"coh3-background"}
        radius="md"
        height={400}
      />
      <Paper shadow="xs" radius="md" mt="md" p="lg" color="gray">
        <Title order={1}>Company of Heroes 3 is out🎉</Title>
        <Title order={2} size="h4" pt="md">
          Leaderboards, Player Cards, Player Matches are done. <br />
          But we want to do a lot more! All the help is welcome.
        </Title>
        <Text pt="sm">
          Find your player card using search or leaderboards.
          <br />
          Search now works only with exact name match (case-sensitive)
        </Text>
        <Text pt="sm">More info on Github or Discord</Text>
        <Group pt="md">
          <Discord />
          <Github />
          <Donate />
        </Group>
      </Paper>
      <TwitchPanel twitchStreams={twitchStreams} error={error} />
    </Container>
  );
};

export default Home;

export async function getServerSideProps() {
  let error: Error | null = null;
  let twitchStreams: TwitchStream[] | null = null;

  try {
    twitchStreams = await getTwitchStreams();
    console.log(twitchStreams);
  } catch (e: any) {
    console.error(`Failed getting data for twitch streams`);
    console.error(e);
    error = e.message;
  }

  return { props: { twitchStreams, error } };
}
