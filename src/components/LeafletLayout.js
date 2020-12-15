import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class LeafletLayout extends Component {
  disableVerse = (songID, index) => {
    console.log("Disable verse {} from song {}", index, songID)
  }

  onDragEnd = (result) => {
    // dropped outside the list or to another list
    if (!result.destination || result.destination.droppableId !== result.source.droppableId) {
      return;
    }
    if (result.type === "song") {
      this.props.reorderSelectedSongs(result.source.index, result.destination.index)
    } else if (result.type === "verse") {
      this.props.reorderSelectedVerses(result.source.droppableId, result.source.index, result.destination.index)
    }
  }

  onVerseDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.props.reorderSelectedVerses(result.source.droppableId, result.source.index, result.destination.index)
  }
  
  render() {
    const { selected } = this.props;

    return (
      <div className="container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" type="song">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {selected.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {song.title}
                          <Droppable droppableId={song.id} type="verse">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {song.verses.map((verse, index) => (
                                  <Draggable key={song.id+"_"+index} draggableId={song.id+"_"+index} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        onClick={() => this.disableVerse(song.id, index)}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        {verse.lyrics}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

LeafletLayout.propTypes = {
  reorderSelectedSongs: PropTypes.func,
  reorderSelectedVerses: PropTypes.func,
  selected: PropTypes.array,
}

export default LeafletLayout;
