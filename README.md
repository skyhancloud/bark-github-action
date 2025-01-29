# bark-github-action

![Bark Logo](https://i.imgur.com/xcs8YFq.png)

Allow GitHub Actions to push iOS notifications via Bark.

---

## Table of Contents
- [Quick Start](#quick-start)
- [Inputs](#inputs)
- [Contributing](#contributing)
- [Help](#help)
- [License](#license)

## Quick Start

```yaml
steps:
  - uses: chimpdev/bark-github-action@v1
    with:
        device_key: ${{ secrets.BARK_KEY }}
        server_url: ${{ secrets.BARK_SERVER_URL }}
        title: 'Action {{ github.event_name }}'
        body: 'Workflow {{ github.workflow }} has completed with status {{ job.status }}.'
        url: '{{ github.server_url }}/{{ github.repository }}/actions/runs/{{ github.run_id }}'
    if: always() # Run this step regardless of the outcome of previous steps
```

## Inputs
| Name | Description | Required | Default |
| --- | --- | --- | --- |
| `device_key` | The device key for the Bark server. | `true` | N/A |
| `server_url` | The URL of the Bark server. | `true` | N/A |
| `title` | The title of the push notification. | `false` | N/A |
| `body` | The content of the push notification. | `true` | N/A |
| `subtitle` | The subtitle of the push notification. | `false` | N/A |
| `badge` | The badge number for the notification. | `false` | `0` |
| `sound` | The sound to play with the notification. | `false` | N/A |
| `icon` | The icon URL for the notification. (Must be a .jpg file) | `false` | N/A |
| `group` | The group name for grouping messages. | `false` | N/A |
| `url` | The URL to open when the notification is clicked. | `false` | N/A |
| `level` | The level of the notification. (Must be one of `critical`, `active`, `timeSensitive`, `passive`) | `false` | N/A |
| `volume` | The volume of the notification. (Must be between 0 and 10) | `false` | N/A |
| `is_archive` | Whether to archive the notification. | `false` | N/A |
| `copy` | Custom text to copy when the notification is copied. | `false` | N/A |
| `auto_copy` | Whether to auto-copy the notification. | `false` | N/A |
| `call` | Whether to repeat the ringtone on click. | `false` | N/A |
| `action` | Action to perform when the notification is clicked. (Must be `none`) | `false` | N/A |

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the code passes any existing tests.
4. Commit your changes with descriptive commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
5. Push your changes to your fork and submit a pull request to the `main` branch of the original repository.

Please make sure to follow the [Code of Conduct](.github/CODE_OF_CONDUCT.md) and [Contributing Guidelines](.github/CONTRIBUTING.md) when contributing to this project.

## Help

If you encounter any issues with the Lantern or have any questions, feel free to [open an issue](https://github.com/chimpdev/bark.js/issues) on this repository. We'll do our best to assist you!

## License

This project is licensed under [The GNU General Public License v3.0](LICENSE).

## Acknowledgements

- [Bark](https://github.com/Finb/bark) - The iOS App for push notifications
- [Bark.js](https://github.com/chimpdev/bark.js) - The JavaScript library for sending notifications