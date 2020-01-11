<template>
  <nav>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="d-flex align-center">
        <v-img
          alt="Zeal Logo"
          class="shrink mx-4"
          contain
          src="../assets/Zeal-Logo.png"
          transition="scale-transition"
          width="75"
        />

        <v-toolbar-title class="hidden-sm-and-down">
          <span class="title">Online Remote Classroom</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon size="30">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.stop="joinClass = true">
            <v-dialog v-model="joinClass" max-width="300px">
              <v-card>
                <v-card-title>Join Class</v-card-title>
                <v-card-text>
                  <v-text-field label="Enter the class code:"></v-text-field>
                </v-card-text>
                <v-row justify="space-around">
                  <v-btn color="warning" outlined @click.stop="joinClass = false">Cancel</v-btn>
                  <v-btn color="success" outlined>Join</v-btn>
                </v-row>
                <v-row>
                  <div class="mt-5"></div>
                </v-row>
              </v-card>
            </v-dialog>
            <v-btn text>Join Class</v-btn>
          </v-list-item>

          <v-list-item @click.stop="createClass = true">
            <v-dialog v-model="createClass" max-width="500px">
              <v-card>
                <v-card-title>Create Class</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-select
                      :items="subjects"
                      item-text="name"
                      item-value="route"
                      label="Select a subject:"
                      return-object
                    ></v-select>
                  </v-row>
                </v-card-text>
                <v-row justify="space-around">
                  <v-btn color="warning" outlined @click.stop="createClass = false">Cancel</v-btn>
                  <v-btn color="success" outlined>Create</v-btn>
                </v-row>
                <v-row>
                  <div class="mt-5"></div>
                </v-row>
              </v-card>
            </v-dialog>
            <v-btn text>Create Class</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>

      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-icon :class="$vuetify.theme.dark ? 'd-flex' : 'd-none'">mdi-white-balance-sunny</v-icon>
            <v-icon :class="$vuetify.theme.dark ? 'd-none' : 'd-flex'">mdi-moon-waning-crescent</v-icon>
            <v-btn text :class="$vuetify.theme.dark ? 'd-flex' : 'd-none'">Enable Light Theme</v-btn>
            <v-btn text :class="$vuetify.theme.dark ? 'd-none' : 'd-flex'">Enable Dark Theme</v-btn>
          </v-list-item>

          <v-list-item @click="signOut()">
            <v-icon>mdi-exit-to-app</v-icon>
            <v-btn text>Sign Out</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      color="primary"
      dark
      width="350px"
      class="d-lg-flex"
    >
      <v-row justify="space-around">
        <v-avatar color="teal" size="150" class="mt-10">
          <v-icon size="150">mdi-account</v-icon>
        </v-avatar>
      </v-row>

      <v-row justify="space-around" class="my-3">
        <span class="white--text headline my-2">Sodavin Chheng</span>
      </v-row>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item to="/home" replace>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <span class="subtitle-1 font-weight-medium">Home</span>
        </v-list-item>

        <v-list-item to="/about" replace>
          <v-list-item-icon>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-icon>
          <span class="subtitle-1 font-weight-medium">About</span>
        </v-list-item>

        <!-- <v-list-item to="/login" replace>
                    <v-list-item-icon>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-icon>
                    <span class="subtitle-1 font-weight-medium">Login</span>
        </v-list-item>-->

        <v-subheader>Subjects</v-subheader>

        <v-list-item
          v-for="subject in subjects"
          :key="subject.name"
          route
          :to="subject.route"
          replace
        >
          <v-list-item-icon>
            <v-icon>{{ subject.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{
              subject.name
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    signOut() {
      this.$router.replace("login");
      location.reload();
    }
  },
  data() {
    return {
      drawer: true,
      joinClass: false,
      createClass: false,
      subjects: [
        { name: "Artificial Intelligence", icon: "mdi-brain", route: "/ai" },
        {
          name: "Cryptography & Network Security",
          icon: "mdi-security",
          route: "/cns"
        },
        {
          name: "Data Structures & Algorithms",
          icon: "mdi-graph",
          route: "/dsa"
        },
        {
          name: "Database Management System",
          icon: "mdi-database",
          route: "/dbms"
        },
        { name: "Growth Hacking", icon: "mdi-trending-up", route: "/gh" },
        { name: "Leadership & Communication", icon: "mdi-voice", route: "/lc" },
        { name: "Web App Development", icon: "mdi-web", route: "/wad" }
      ]
    };
  }
};
</script>
