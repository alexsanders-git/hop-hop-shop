'use client';
import styles from './styles.module.scss';
// eslint-disable-next-line import/no-unresolved
// import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import React from 'react';

interface MenuBarProps {
	editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<div className={styles.menuWrapper}>
			<div className={styles.menuContainer}>
				<div className={styles.buttonsWrapper}>
					<button
						style={{ fontWeight: 'bold' }}
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? `${styles.active}` : ''}
					>
						<b>B</b>
					</button>
					<button
						style={{ fontStyle: 'italic' }}
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'is-active' : ''}
					>
						I
					</button>
					<button
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={editor.isActive('underline') ? 'is-active' : ''}
					>
						<span className={styles.underline}>U</span>
					</button>
				</div>
				<div className={styles.buttonsWrapper}>
					<button
						onClick={() => editor.chain().focus().setTextAlign('left').run()}
						className={
							editor.isActive({ textAlign: 'left' }) ? `${styles.activeBg}` : ''
						}
					>
						<div className={styles.alignLeft}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>

					<button
						onClick={() => editor.chain().focus().setTextAlign('center').run()}
						className={
							editor.isActive({ textAlign: 'center' })
								? `${styles.activeBg}`
								: ''
						}
					>
						<div className={styles.alignCenter}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>

					<button
						onClick={() => editor.chain().focus().setTextAlign('right').run()}
						className={
							editor.isActive({ textAlign: 'right' })
								? `${styles.activeBg}`
								: ''
						}
					>
						<div className={styles.alignRight}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>
				</div>
				<div className={styles.buttonsWrapper}>
					<button
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={editor.isActive('orderedList') ? 'is-active' : ''}
					>
						<div className={styles.orderedList}>
							<span>1</span>
							<span>2</span>
							<span>3</span>
						</div>
					</button>

					{/* Bullet List Button */}
					<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'is-active' : ''}
					>
						<span className={styles.bulletList}>• • •</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default function TestPage() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			// Highlight,
		],
		content: `
      <h3 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
	});

	return (
		<>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
}
