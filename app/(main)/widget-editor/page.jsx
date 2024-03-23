'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Widget from '@components/Widget';
import Button from '@components/Button';
import ColorPicker from '@components/ColorPicker';
import Status from '@components/Status';

function WidgetEditor() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const github_prefix = '/faceit-tracker'

    const [nickname, setNickname] = useState('');
    const [border_radius, setBorderRadius] = useState();
    const [backgroundColor, setBackgroundColor] = useState("1f1f22");
    const [fontColor, setFontColor] = useState('ffffff');
    const [data, setData] = useState();
    const [elo, setElo] = useState('100');
    const [level, setLevel] = useState('1');

    useEffect(() => {
        const updateStates = () => {
            const backgroundParam = searchParams.get('background-color');
            const colorParam = searchParams.get('font-color');
            const borderRadiusParam = searchParams.get('border-radius');
            const nicknameParam = searchParams.get('nickname');

            if (backgroundParam) {
                setBackgroundColor(backgroundParam);
                document.getElementById('background-color').value = "#" + backgroundParam;
            }

            if (colorParam) {
                setFontColor(colorParam);
                document.getElementById('text-color').value = "#" + colorParam;
            }

            if (borderRadiusParam) {
                setBorderRadius(borderRadiusParam);
                document.getElementById('border-radius').value = borderRadiusParam;
            }

            if (nicknameParam) {
                setNickname(nicknameParam);
                document.getElementById('faceit-nickname').value = nicknameParam;
            }
        };

        const timeout = setTimeout(() => {
            updateStates();
        }, 500)

    }, [])


    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee'
        };
        fetch("https://open.faceit.com/data/v4/players?nickname=" + nickname + "&game=cs2", { headers, method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                if (data.games) {
                    setElo(data.games.cs2.faceit_elo);
                    setLevel(data.games.cs2.skill_level);
                }
            })
    }, [nickname]);

    function update_widget(term, param) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(param, term);
        } else {
            params.delete(param)
        }

        router.replace(`${pathname}?${params.toString()}`, { shallow: true });
    }

    return (
        <section className='content'>
            <div className="widget-editor-content">
                <div className="heading">Create your own FACEIT Widget
                    <span id="status">BETA</span>
                </div>
                <div className="editor">
                    <div className="widget-editor">
                        <div className="setting">
                            <div className="truncate tooltip setting-label">FACEIT Nickname
                                {/* <span className="tooltip-text">Case-Sensitive</span> */}
                            </div>
                            <div className="flex">
                                <input type="text" id="faceit-nickname" placeholder="FrozenBag" onBlur={e => {
                                    setNickname(searchParams.get('nickname'));
                                }} onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        setNickname(searchParams.get('nickname'));
                                    }
                                }} onChange={e => update_widget(e.target.value, "nickname")} />
                                {/* <Button className="!h-[35px] !leading-[12px] !w-10 !ml-1 !rounded-[4px] !px-0 !text-[16px]" onClick={e => { setNickname(searchParams.get('nickname')); }} text="S" /> */}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="truncate setting-label">Game
                                {/* <span className="tooltip-text">Currently only supports CS2, as that's <b>AFAIK</b> the only game that
                                        supports matchmaking. <b>(where ELO changes)</b></span> */}
                            </div>
                            <select name="game" className='w-full' id="game-dropdown" disabled>
                                <option defaultValue="cs2">CS2</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <div className="truncate setting-label">Background Color</div>
                            <div className="container flex">
                                <ColorPicker onBlur={e => {
                                    update_widget(e.target.value.replace("#", ""), "background-color")
                                }} onInput={e => {
                                    setBackgroundColor(e.target.value.replace("#", ""), "background-color");
                                }} className='w-full' name="widget-background-color" id="background-color" value={`#${backgroundColor}`} />
                                <Button onClick={e => {
                                    update_widget("1f1f22", "background-color")
                                    setBackgroundColor("1f1f22", "background-color");
                                    document.getElementById("background-color").value = "#1f1f22";
                                }} className="default-button" />
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="truncate setting-label">Text Color</div>
                            <div className="container flex">
                                <ColorPicker onBlur={e => {
                                    update_widget(e.target.value.replace("#", ""), "text-color")
                                }} onInput={e => {
                                    setFontColor(e.target.value.replace("#", ""), "text-color");
                                }} className='w-full' name="widget-text-color" id="text-color" value={`#${fontColor}`} />
                                <Button onClick={e => {
                                    update_widget("ffffff", "text-color")
                                    setFontColor("ffffff", "text-color");
                                    document.getElementById("text-color").value = "#ffffff";
                                }} className="default-button" />
                            </div>
                        </div>
                        <div className="setting">
                            <div className="truncate setting-label">Border Radius</div>
                            <div className="container flex">
                                <input type="number" onInput={e => {
                                    update_widget(e.currentTarget.value, "border-radius")
                                    setBorderRadius(e.currentTarget.value, "border-radius");
                                }} className='w-full' name="widget-border-radius" id="border-radius" min="0" max="24" defaultValue="24" />
                                <Button onClick={e => {
                                    update_widget("24", "border-radius");
                                    setBorderRadius("24", "border-radius");
                                    document.getElementById("border-radius").value = "24";
                                }} className="default-button" />
                            </div>
                        </div>
                    </div>
                    <div className="widget-preview">
                        <Image
                            className='size-full blur-[2px] grayscale-[5%] pointer-events-none -z-10'
                            style={{
                                scale: "250%"
                            }}
                            src="/assets/images/nuke_default_s2.jpg"
                            alt="de_nuke in CS2"
                            fill='true'
                            objectFit='cover'
                            objectPosition='center'
                        />
                        <Widget src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${level}_svg.svg`} elo={elo} className="" style={{ borderRadius: border_radius + "px", backgroundColor: "#" + backgroundColor }} textColor={{ color: "#" + fontColor }} />
                    </div>
                </div>
                <Button className="!w-full" text="Copy Link" onClick={e => {
                    document.getElementById("status-thingy").classList.remove("hidden");
                    navigator.clipboard.writeText(window.location.origin + github_prefix + "/widget?" + searchParams)
                }} />
                <Status id="status-thingy" text="Copied link!" className="hidden" />
            </div>
        </section >
    )
}

export default WidgetEditor