export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        {
            name: "userName",
            title: "Username",
            type: "string"
        },
        {
            name: "profilePicture",
            title: "Profile Picture",
            type: "image",
                  options: {
        hotspot: true,
      },
        }
    ]
}