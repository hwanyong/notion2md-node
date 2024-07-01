// const blockToMarkdown = {
// 	child_database    : block => block.child_database.title,
// 	child_page        : block => `## ${block.child_page.title}`,
// 	code              : block => `\`\`\`${block.code.language}\n${block.code.text.map(text => text.plain_text).join('')}\n\`\`\``,
// 	column            : block => block.column.children.map(child => convert(child)).join('\n'),
// 	column_list       : block => block.column_list.children.map(child => convert(child)).join('\n'),
// 	divider           : () => `---`,
// 	embed             : block => `[Embed](${block.embed.url})`,
// 	equation          : block => `$${block.equation.expression}$`,
// 	file              : block => `[File](${block.file.file ? block.file.url : block.file.external.url})`,
// 	heading_1         : block => `# ${block.heading_1.text.map(text => text.plain_text).join('')}`,
// 	heading_2         : block => `## ${block.heading_2.text.map(text => text.plain_text).join('')}`,
// 	heading_3         : block => `### ${block.heading_3.text.map(text => text.plain_text).join('')}`,
// 	image             : block => `![${block.image.caption ? block.image.caption.map(text => text.plain_text).join('') : ''}](${block.image.file ? block.image.file.url : block.image.external.url})`,
// 	link_preview      : block => `[Link Preview](${block.link_preview.url})`,
// 	mention           : block => block.mention.type === 'user' ? `@${block.mention.user.name}`                                                                                                      : '',
// 	numbered_list_item: block => `1. ${block.numbered_list_item.text.map(text => text.plain_text).join('')}`,
// 	paragraph         : block => block.paragraph.text.map(text => text.plain_text).join(''),
// 	pdf               : block => `[PDF](${block.pdf.file ? block.pdf.file.url : block.pdf.external.url})`,
// 	quote             : block => `> ${block.quote.text.map(text => text.plain_text).join('')}`,
// 	synced_block      : block => block.synced_block.title,
// 	table             : block => {
// 		const rows = block.table.rows.map(row => row.map(cell => cell.plain_text))
// 		const header = rows.shift()

// 		const headerRow = `| ${header.join(' | ')} |`
// 		const separatorRow = `| ${header.map(() => '---').join(' | ')} |`
// 		const bodyRows = rows.map(row => `| ${row.join(' | ')} |`)

// 		return [headerRow, separatorRow, ...bodyRows].join('\n')
// 	},
// 	table_row		 : block => block.table_row.children.map(child => convert(child)).join(''),
// 	table_of_contents : () => `[Table of Contents]`,
// 	to_do             : block => `- [${block.to_do.checked ? 'x' : ' '}] ${block.to_do.text.map(text => text.plain_text).join('')}`,
// 	toggle            : block => `<details><summary>${block.toggle.text.map(text => text.plain_text).join('')}</summary></details>`,
// 	video             : block => `[Video](${block.video.file ? block.video.file.url : block.video.external.url})`,

// 	link_to_page      : block => `[Link to Page](${block.link_to_page.page_id})`,
// 	unsupported       : () => `Unsupported block type`,
// }

const bookmark = block => `[Block](${block[block.type].url})`
// TODO: Implement more paragraph types
const paragraph = block => block[block.type].rich_text.map(text => text.plain_text).join('')
// const breadcrumb = block => `[Breadcrumb](${block.breadcrumb.url})`// unsupported on Markdown
const bulleted_list_item = block => `- ${block[block.type].rich_text.map(text => text.plain_text).join('')}`
const callout = block => `<aside>\n${block[block.type].icon.emoji} ${block[block.type].rich_text.map(text => text.plain_text).join('')}\n\n</aside>`
// TODO: apply urlEncode to path
const child_database = block => `[${block[block.type].title}]({urlEncode(page name)%20(page id)}/${block[block.type].title}%20${block.id})`

class Notion2MD_node {
	#BlockTypes = {
		bookmark,
		bulleted_list_item,
		paragraph,
		callout,
		child_database
	}

	constructor() {}

	convertBlocktoMD(block) {
	}

	get(block) {
		if (!this.#BlockTypes[block.type]) {
			return this.#BlockTypes['unsupported']
		}

		return this.#BlockTypes[block.type](block)
	}
}

module.exports = {
	notion2md_node: Notion2MD_node
}